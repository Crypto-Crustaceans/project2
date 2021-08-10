# import libaries
import datetime as dt
import pandas as pd
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from sqlalchemy.ext.automap import automap_base
import pprint

def finbert_app():

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

    # create inspector and show columns in table News
    inspector = inspect(engine)
    news_columns = inspector.get_columns('news')

    # show columns in table Finbert
    finbert_columns = inspector.get_columns('finbert')

    # show columns in table Yfinance
    yfinance_columns = inspector.get_columns('yfinance')

    # create session
    session = Session(engine)

    # SQL query to get data in format for js viz

    with engine.connect() as con:

        query = con.execute(
            "select y.*, j.avg_sentiment \
            from yfinance y \
            left join \
            (select DATE(n.date) as date, AVG(f.sentiment_score) as avg_sentiment \
            from news n \
            join finbert f on n.id = f.id \
            GROUP by DATE(n.date)\
            ) as j on y.date = j.date \
            where y.date > '2009-12-31'"
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

