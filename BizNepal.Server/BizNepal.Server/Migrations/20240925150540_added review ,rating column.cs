using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedreviewratingcolumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("804adda0-7892-458d-8772-3967b52f9b68"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("894b8f1f-c2ef-4018-9008-5a47e3583b8d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("89ea7c12-20bc-4f80-b7cc-b612f23499a2"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("9eac2a0b-9ed3-4b6f-a0d1-7a3f33452dbe"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("e4bfe284-42c8-40e0-9c8a-a3bd38b743de"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("f577d4f7-3ce0-49d7-88f8-5b375cbbbdc5"));

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReviewDate",
                table: "Reviews",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Businesses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "OverallRating",
                table: "Businesses",
                type: "decimal(18,2)",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "ReviewDate",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Businesses");

            migrationBuilder.DropColumn(
                name: "OverallRating",
                table: "Businesses");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "CategoryName" },
                values: new object[,]
                {
                    { new Guid("804adda0-7892-458d-8772-3967b52f9b68"), "Hospital" },
                    { new Guid("894b8f1f-c2ef-4018-9008-5a47e3583b8d"), "Shopping" },
                    { new Guid("89ea7c12-20bc-4f80-b7cc-b612f23499a2"), "Cafe" },
                    { new Guid("9eac2a0b-9ed3-4b6f-a0d1-7a3f33452dbe"), "Resturant" },
                    { new Guid("e4bfe284-42c8-40e0-9c8a-a3bd38b743de"), "Hotels" },
                    { new Guid("f577d4f7-3ce0-49d7-88f8-5b375cbbbdc5"), "Gym" }
                });
        }
    }
}
