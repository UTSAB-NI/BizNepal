using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class deleteimageurlfrombusiness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("5eb3aa59-05c5-409e-9c63-35bbe91cefc2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("80116b69-1612-482a-9318-6b685efaa4f0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("9f6967c8-2a1f-47d3-9cf1-605b3f67a57c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("a48ffc4b-9115-4275-84d6-f19fa1359128"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("c7acb506-f0a1-453d-b4a4-431b5450dc5c"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("e38fbc1b-1291-4de6-bea7-4f2d74fc3dd5"));

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "CategoryName" },
                values: new object[,]
                {
                    { new Guid("10ff88ae-8850-4f0f-988d-d772cf9d6900"), "Resturant" },
                    { new Guid("72e94afa-9272-4cef-b653-fa4ed520ebfd"), "Shopping" },
                    { new Guid("a787c5ac-90fc-440d-a38a-717cc6baf29e"), "Hospital" },
                    { new Guid("db787fbd-2e9c-4469-af99-ff30248cfe18"), "Cafe" },
                    { new Guid("de57da2f-e1ef-4ead-ab1b-62eefb4c8fd0"), "Gym" },
                    { new Guid("e04972a5-1358-47ca-9fd1-2f01de5d1b5a"), "Hotels" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("10ff88ae-8850-4f0f-988d-d772cf9d6900"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("72e94afa-9272-4cef-b653-fa4ed520ebfd"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("a787c5ac-90fc-440d-a38a-717cc6baf29e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("db787fbd-2e9c-4469-af99-ff30248cfe18"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("de57da2f-e1ef-4ead-ab1b-62eefb4c8fd0"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("e04972a5-1358-47ca-9fd1-2f01de5d1b5a"));

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "CategoryName" },
                values: new object[,]
                {
                    { new Guid("5eb3aa59-05c5-409e-9c63-35bbe91cefc2"), "Hotels" },
                    { new Guid("80116b69-1612-482a-9318-6b685efaa4f0"), "Gym" },
                    { new Guid("9f6967c8-2a1f-47d3-9cf1-605b3f67a57c"), "Resturant" },
                    { new Guid("a48ffc4b-9115-4275-84d6-f19fa1359128"), "Cafe" },
                    { new Guid("c7acb506-f0a1-453d-b4a4-431b5450dc5c"), "Shopping" },
                    { new Guid("e38fbc1b-1291-4de6-bea7-4f2d74fc3dd5"), "Hospital" }
                });
        }
    }
}
