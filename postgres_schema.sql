CREATE TABLE "yfinance" (
    "date" DATE   NOT NULL,
    "open" DECIMAL   NOT NULL,
    "high" DECIMAL   NOT NULL,
    "low" DECIMAL   NOT NULL,
    "close" DECIMAL   NOT NULL,
    "adj_close" DECIMAL   NOT NULL,
    "volume" DECIMAL   NOT NULL,
    CONSTRAINT "pk_yfinance" PRIMARY KEY (
        "date"
     )
);

CREATE TABLE "finbert" (
    "id" INT   NOT NULL,
    "sentence" VARCHAR   NOT NULL,
    "prediction" VARCHAR   NOT NULL,
    "sentiment_score" DECIMAL   NOT NULL,
    CONSTRAINT "pk_finbert" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "news" (
    "id" INT   NOT NULL,
    "date" TIMESTAMPTZ   NOT NULL,
    "stock" VARCHAR   NOT NULL,
    CONSTRAINT "pk_news" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "finbert" ADD CONSTRAINT "fk_finbert_id" FOREIGN KEY("id")
REFERENCES "news" ("id");

