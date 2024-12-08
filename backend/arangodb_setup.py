from arango import ArangoClient

def get_db():
    client = ArangoClient()
    db = client.db('movieRecommendations', username='root', password='rootPassword')
    return db