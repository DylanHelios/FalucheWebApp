from neo4j_db.RequeteNeo4J import run_query
from fastapi import APIRouter


router = APIRouter(
    prefix="/insignes",
    tags=["Insignes"]
)

@router.get("/circulaire/{provenance}")
def get_insignes(provenance: str):
    query = """
    MATCH (n:Insigne)-[r]->(m)
    WHERE n.provenance = $provenance
    RETURN n, type(r) AS relation, m
    """

    results = run_query(query, {"provenance": provenance})
    return results
