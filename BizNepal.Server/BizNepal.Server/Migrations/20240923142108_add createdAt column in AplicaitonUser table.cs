using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class addcreatedAtcolumninAplicaitonUsertable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("4994fa1d-067f-4624-9500-a7af2ae6d56d"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("5bcf9a21-560e-4e68-a2c3-7de206bbcd85"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("a2340f4d-4d53-4a92-a250-c37147403bec"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("d9ba161f-1bdb-4793-b5e9-8ef4598c769e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("db5ab1c4-d2e8-453d-bdb1-0b540acdaa33"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("e39cf986-57a5-4692-a0d2-0d60cfbc9df8"));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "CategoryName" },
                values: new object[,]
                {
                    { new Guid("4994fa1d-067f-4624-9500-a7af2ae6d56d"), "Cafe" },
                    { new Guid("5bcf9a21-560e-4e68-a2c3-7de206bbcd85"), "Gym" },
                    { new Guid("a2340f4d-4d53-4a92-a250-c37147403bec"), "Shopping" },
                    { new Guid("d9ba161f-1bdb-4793-b5e9-8ef4598c769e"), "Resturant" },
                    { new Guid("db5ab1c4-d2e8-453d-bdb1-0b540acdaa33"), "Hospital" },
                    { new Guid("e39cf986-57a5-4692-a0d2-0d60cfbc9df8"), "Hotels" }
                });
        }
    }
}
