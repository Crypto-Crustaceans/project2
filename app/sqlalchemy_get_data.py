# import libaries
import sqlalchemy
import pandas as pd
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from sqlalchemy.ext.automap import automap_base

def get_data():

    # create engine to postgres db
    engine = create_engine('postgresql+psycopg2://postgres:postgres@localhost:5432/fin_news_db')

    # declare Base
    Base = automap_base()

    # reflect the tables
    Base.prepare(engine, reflect=True)

    # save references to each table
    News = Base.classes.news
    Finbert = Base.classes.finbert
    Yfinance = Base.classes.yfinance

    # create session
    session = Session(engine)

    # SQL query to get data in format for js viz
    with engine.connect() as con:

        query = con.execute(
            "SELECT y.*, j.avg_sentiment \
            FROM yfinance y \
            LEFT JOIN ( \
                SELECT DATE(n.date) as date, AVG(f.sentiment_score) as avg_sentiment \
                FROM news n \
                INNER JOIN finbert f on n.id = f.id \
                GROUP by DATE(n.date)\
            ) as j on y.date = j.date \
            WHERE y.date > '2009-12-31'"
        )

        # put query results in a list
        list = []
        for r in query:
            list.append(r)


        df = pd.DataFrame(list, columns =['date', 
                                        'open', 
                                        'high', 
                                        'low', 
                                        'close', 
                                        'adj_close', 
                                        'volume', 
                                        'sentiment'
                                        ])

        json = df.to_json(orient='records')
    
    # close connection
        con.close()
    engine.dispose()
    
    #return data in json format
    return json