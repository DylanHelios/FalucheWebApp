from fastapi import APIRouter
from database.dbNeo4J import neo4jDB

router = APIRouter(
    prefix="/api/insignes",
    tags=["Insignes"]
)

@router.get("/{provenance}")
def get_insignes(provenance: str):
    query = """
    MATCH (n:Insigne)-[r]->(m)
    WHERE n.provenance = $provenance
    RETURN n, type(r) AS relation, m
    """

    results = neo4jDB.run_query(query, {"provenance": provenance})
    return results
