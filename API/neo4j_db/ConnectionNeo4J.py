import os
from dotenv import load_dotenv
from neo4j import GraphDatabase
from typing import Optional, Dict, Any, List
import logging

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- LA CLASSE DE CONNEXION ---
class ConnectionNeo4j:
    def __init__(self):
        self.uri = os.getenv("NEO4J_URI")
        self.user = os.getenv("NEO4J_USER")
        self.password = os.getenv("NEO4J_PASSWORD")
        self.driver = None
        self._connect()

    def _connect(self):
        try:
            self.driver = GraphDatabase.driver(self.uri, auth=(self.user, self.password))
            self.driver.verify_connectivity()
        except Exception as e:
            logger.error(f"Erreur Neo4j: {e}")
            raise

    def run_query(self, query: str, params: Optional[Dict[str, Any]] = None):
        with self.driver.session() as session:
            # .data() convertit les noeuds Neo4j en dictionnaires lisibles par React
            result = session.run(query, params or {})
            return [record.data() for record in result]

    def close(self):
        if self.driver:
            self.driver.close()