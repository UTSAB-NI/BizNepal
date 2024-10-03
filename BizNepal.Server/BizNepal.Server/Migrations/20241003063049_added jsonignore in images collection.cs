using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedjsonignoreinimagescollection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("0a0095ea-f2bc-4f28-80c8-34acb975da39"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("31428fa7-e77b-449a-b4c4-b5709a7df8d9"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("55f7ef49-ce4a-4062-8abe-c554c6f85327"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("db317759-edb2-4317-9440-21aed4a8d32a"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("e308c01c-f4ab-4316-8211-37e9ded10964"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("f9bcf36a-dd82-4a02-a44b-b08a951c753b"));

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { new Guid("0a0095ea-f2bc-4f28-80c8-34acb975da39"), "Hospital" },
                    { new Guid("31428fa7-e77b-449a-b4c4-b5709a7df8d9"), "Hotels" },
                    { new Guid("55f7ef49-ce4a-4062-8abe-c554c6f85327"), "Cafe" },
                    { new Guid("db317759-edb2-4317-9440-21aed4a8d32a"), "Resturant" },
                    { new Guid("e308c01c-f4ab-4316-8211-37e9ded10964"), "Shopping" },
                    { new Guid("f9bcf36a-dd82-4a02-a44b-b08a951c753b"), "Gym" }
                });
        }
    }
}
