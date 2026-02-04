from fastapi import APIRouter
from database.dbNeo4J import neo4jDB

router = APIRouter(
    prefix="/api/emblemes",
    tags=["Emblemes"]
)

@router.get("/")
def get_emblemes():
    query = """
        MATCH (e:Embleme)
        MATCH (e)-[:a_pour_matiere]->(m:Matiere)
        MATCH (e)-[:a_pour_domaine]->(d:Domaine)
        MATCH (d)-[:a_pour_couleur]->(co:Couleur)
        OPTIONAL MATCH (e)-[:ressemble_a]->(i:Image)
        RETURN 
            m.name AS Matiere,
            co.name AS Couleur,
            d.name AS Domaine,
            e.name AS Embleme,
            i.data AS ImageData
        ORDER BY m.name, d.name, e.name
    """

    results = neo4jDB.run_query(query)
    return results

@router.get("/{matiere}")
def get_emblemes_matiere(matiere: str):
    query = """
        MATCH (e:Embleme)-[:a_pour_matiere]->(m:Matiere)
        WHERE toLower(m.name) = toLower($matiere)
        MATCH (e)-[:a_pour_domaine]->(d:Domaine)
        MATCH (d)-[:a_pour_couleur]->(co:Couleur)
        OPTIONAL MATCH (e)-[:ressemble_a]->(i:Image)
        RETURN 
            m.name AS Matiere,
            co.name AS Couleur,
            d.name AS Domaine,
            e.name AS Embleme,
            i.data AS ImageData
        ORDER BY co.name, d.name, e.name
    """

    results = neo4jDB.run_query(query, {"matiere": matiere})
    return results
