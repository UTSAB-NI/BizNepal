using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class removebusinessnavigationfromBusinessImagetable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("77c1ea9a-a7a2-49ca-8c88-736e923ce59f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("9dd385c4-2ae7-4170-88ea-faf7b069fac6"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("a3025bc6-4f5c-468e-bfbd-35feac7c0af5"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("a7b4c637-c66f-4a40-a991-f2631eabb356"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("b9fd0267-2322-45ec-ac26-836ae681dbd4"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("f77b6f40-4de9-4fe1-bdbc-711d0459f3fa"));

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "CategoryName" },
                values: new object[,]
                {
                    { new Guid("1233e58a-0c01-4265-b22f-1e2164ef01ea"), "Hotels" },
                    { new Guid("1bcfafcc-d0f3-4172-8291-d4c20f45fef0"), "Resturant" },
                    { new Guid("4ba9783d-3fc2-403a-a452-e39c6262618f"), "Gym" },
                    { new Guid("4baec8fd-977c-44aa-ab8d-23c901726337"), "Hospital" },
                    { new Guid("51a4ec79-56fb-425e-bb1e-3f15b03e2a36"), "Cafe" },
                    { new Guid("61aca1c6-695b-474f-9f3f-5713041c22c4"), "Shopping" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("1233e58a-0c01-4265-b22f-1e2164ef01ea"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("1bcfafcc-d0f3-4172-8291-d4c20f45fef0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("4ba9783d-3fc2-403a-a452-e39c6262618f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("4baec8fd-977c-44aa-ab8d-23c901726337"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("51a4ec79-56fb-425e-bb1e-3f15b03e2a36"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("61aca1c6-695b-474f-9f3f-5713041c22c4"));

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "CategoryName" },
                values: new object[,]
                {
                    { new Guid("77c1ea9a-a7a2-49ca-8c88-736e923ce59f"), "Shopping" },
                    { new Guid("9dd385c4-2ae7-4170-88ea-faf7b069fac6"), "Gym" },
                    { new Guid("a3025bc6-4f5c-468e-bfbd-35feac7c0af5"), "Hotels" },
                    { new Guid("a7b4c637-c66f-4a40-a991-f2631eabb356"), "Cafe" },
                    { new Guid("b9fd0267-2322-45ec-ac26-836ae681dbd4"), "Hospital" },
                    { new Guid("f77b6f40-4de9-4fe1-bdbc-711d0459f3fa"), "Resturant" }
                });
        }
    }
}
