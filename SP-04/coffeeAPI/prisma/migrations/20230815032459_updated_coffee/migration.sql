/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Coffee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plantedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "origin" TEXT,
    "treeHeight" REAL NOT NULL DEFAULT 0,
    "latitude" INTEGER NOT NULL DEFAULT 0,
    "longitude" INTEGER NOT NULL DEFAULT 0,
    "altitude" INTEGER NOT NULL DEFAULT 0,
    "avgTemp" REAL,
    "humidity" REAL,
    "rainfall" REAL,
    "lightIntensity" REAL,
    "nutrition" REAL,
    "moisture" REAL,
    "conductivity" REAL,
    "authorId" INTEGER,
    CONSTRAINT "Coffee_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
