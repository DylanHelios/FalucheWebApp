from fastapi import APIRouter
from database.dbNeo4J import neo4jDB

router = APIRouter(
    prefix="/api/emblemes",
    tags=["Emblemes"]
)

@router.get("/")
def get_emblemes():
    query = """
        MATCH (m:Matiere)-[:de_couleur]->(co:Couleur)
        MATCH (co)-[:represente_le_domaine]->(d:Domaine)
        MATCH (d)-[:a_pour_embleme]->(e:Embleme)
        OPTIONAL MATCH (e)-[:ressemble_a]->(i:Image)
        RETURN 
            m.name AS Matiere,
            co.name AS Couleur,
            d.name AS Domaine,
            e.name AS Embleme,
            i.path AS ImagePath,
            i.data AS ImageData
        ORDER BY d.name, e.name
    """

    results = neo4jDB.run_query(query)
    return results


@router.get("/{matiere}")
def get_emblemes_matiere(matiere: str):
    query = """
        MATCH (m:Matiere)
        WHERE toLower(m.name) = toLower($matiere)
        MATCH (co:Couleur)<-[:de_couleur]-(m)
        MATCH (co)-[:represente_le_domaine]->(d:Domaine)
        MATCH (d)-[:a_pour_embleme]->(e:Embleme)
        OPTIONAL MATCH (e)-[:ressemble_a]->(i:Image)
        RETURN 
            m.name AS Matiere,
            co.name AS Couleur,
            d.name AS Domaine,
            e.name AS Embleme,
            i.path AS ImagePath,
            i.data AS ImageData
        ORDER BY d.name, e.name
    """
    results = neo4jDB.run_query(query, {"matiere": matiere})
    return results