CREATE TABLE "yfinance" (
    "date" TIMESTAMP   NOT NULL,
    "open" DECIMAL   NOT NULL,
    "high" DECIMAL   NOT NULL,
    "low" DECIMAL   NOT NULL,
    "close" DECIMAL   NOT NULL,
    "adj_close" DECIMAL   NOT NULL,
    "volume" DECIMAL   NOT NULL
);

CREATE TABLE "finbert" (
    "id" INT   NOT NULL,
    "sentence" VARCHAR   NOT NULL,
    "logit_1" DECIMAL   NOT NULL,
    "logit_2" DECIMAL   NOT NULL,
    "logit_3" DECIMAL   NOT NULL,
    "prediction" VARCHAR   NOT NULL,
    "sentiment_score" DECIMAL   NOT NULL,
    CONSTRAINT "pk_finbert" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "news" (
    "id" INT   NOT NULL,
    "title" VARCHAR   NOT NULL,
    "date" TIMESTAMP   NOT NULL,
    "stock" VARCHAR   NOT NULL,
    CONSTRAINT "pk_news" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "news" ADD CONSTRAINT "fk_news_id" FOREIGN KEY("id")
REFERENCES "finbert" ("id");

