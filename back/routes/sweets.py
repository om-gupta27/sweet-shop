from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Sweet, User
from schemas import SweetCreate, SweetResponse, SweetUpdate
from dependencies import get_current_user
from fastapi import Query


router = APIRouter(prefix="/api/sweets", tags=["Sweets"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 

@router.post("/", response_model=SweetResponse)
def create_sweet(
    sweet: SweetCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_sweet = Sweet(**sweet.dict())
    db.add(new_sweet)
    db.commit()
    db.refresh(new_sweet)
    return new_sweet

@router.get("/", response_model=list[SweetResponse])
def get_sweets(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Sweet).all()

@router.get("/search")
def search_sweets(
    name: str | None = None,
    category: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Sweet)

    if name:
        query = query.filter(Sweet.name.ilike(f"%{name}%"))
    if category:
        query = query.filter(Sweet.category.ilike(f"%{category}%"))
    if min_price is not None:
        query = query.filter(Sweet.price >= min_price)
    if max_price is not None:
        query = query.filter(Sweet.price <= max_price)

    return query.all()

@router.put("/{sweet_id}")
def update_sweet(
    sweet_id: int,
    sweet_data: SweetUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    if sweet_data.name is not None:
        sweet.name = sweet_data.name
    if sweet_data.category is not None:
        sweet.category = sweet_data.category
    if sweet_data.price is not None:
        sweet.price = sweet_data.price
    if sweet_data.quantity is not None:
        sweet.quantity = sweet_data.quantity

    db.commit()
    db.refresh(sweet)

    return {"message": "Sweet updated successfully"}


@router.delete("/{sweet_id}")
def delete_sweet(
    sweet_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    db.delete(sweet)
    db.commit()

    return {"message": "Sweet deleted successfully"}

@router.post("/{sweet_id}/purchase")
def purchase_sweet(
    sweet_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    if sweet.quantity <= 0:
        raise HTTPException(status_code=400, detail="Out of stock")

    sweet.quantity -= 1
    db.commit()

    return {
        "message": "Sweet purchased successfully",
        "remaining_quantity": sweet.quantity
    }

@router.post("/{sweet_id}/restock")
def restock_sweet(
    sweet_id: int,
    amount: int = Query(gt=0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    sweet.quantity += amount
    db.commit()

    return {
        "message": "Sweet restocked successfully",
        "new_quantity": sweet.quantity
    }
