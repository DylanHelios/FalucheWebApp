from neo4j_db.ConnectionNeo4J import ConnectionNeo4j

# Instancie la connexion une seule fois
neo4j_conn = ConnectionNeo4j()

def run_query(query: str, params: dict | None = None):
    """
    Exécute une requête Cypher et retourne les résultats sous forme de liste de dictionnaires.

    Args:
        query (str): Requête Cypher à exécuter.
        params (dict | None): Paramètres de la requête.

    Returns:
        list[dict]: Liste des enregistrements retournés par la requête.

    Raises:
        RuntimeError: Si la requête échoue.
    """
    result = neo4j_conn.run_query(query, params)
    if result is None:
        raise RuntimeError("La requête a échoué (voir les logs pour plus de détails).")
    return result
