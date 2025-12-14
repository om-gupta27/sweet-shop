from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class SweetCreate(BaseModel):
    name: str
    category: str
    price: float = Field(gt=0)
    quantity: int = Field(ge=0)

class SweetResponse(SweetCreate):
    id: int

    class Config:
        orm_mode = True

class SweetUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    price: float | None = None
    quantity: int | None = None
