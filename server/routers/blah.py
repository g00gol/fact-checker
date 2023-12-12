from fastapi import APIRouter, Body


router = APIRouter(
    prefix="/blah",
    tags=["blah"],
)


@router.get("/")
async def get_blahs():
    """
    Gets all users from the database.
    """
    users = await get_users()
    return users
