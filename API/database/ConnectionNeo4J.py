from dotenv import load_dotenv
from neo4j import GraphDatabase
import os

load_dotenv()

class ConnectionNeo4j:
    def __init__(self):
        self.uri = os.getenv("NEO4J_URI")
        self.user = os.getenv("NEO4J_USER")
        self.password = os.getenv("NEO4J_PASSWORD")
        self.driver = None

    def connect(self):
        if not self.driver:
            self.driver = GraphDatabase.driver(
                self.uri,
                auth=(self.user, self.password)
            )
            self.driver.verify_connectivity()

    def run_query(self, query, params=None):
        self.connect()
        with self.driver.session() as session:
            result = session.run(query, params or {})
            return [record.data() for record in result]

    def close(self):
        if self.driver:
            self.driver.close()
            self.driver = None
