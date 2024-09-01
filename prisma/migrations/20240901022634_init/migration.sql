-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "nota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nameCliente" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "defeito" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "nota_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_key" ON "user"("user");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_nome_key" ON "cliente"("nome");
