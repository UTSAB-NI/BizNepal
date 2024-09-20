using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class Changebusinessmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Businesses_AspNetUsers_ApplicationUserId",
                table: "Businesses");

            migrationBuilder.DropIndex(
                name: "IX_Businesses_ApplicationUserId",
                table: "Businesses");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("41005000-c22e-4ef8-b8ca-eb79890aaaa8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("5020933d-5fa9-4c60-a125-2523bba36921"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("56aebe1c-02f5-4865-945c-e36a71971936"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("8bb1cdce-9aa4-404f-9c74-71a89bf0b0c7"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("ad1d5ac6-f01b-4996-bb21-1a5d6521e0a8"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("e41fddb0-bea3-48a8-884a-b2420038c7a7"));

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Businesses");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Businesses",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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

            migrationBuilder.CreateIndex(
                name: "IX_Businesses_UserId",
                table: "Businesses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Businesses_AspNetUsers_UserId",
                table: "Businesses",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Businesses_AspNetUsers_UserId",
                table: "Businesses");

            migrationBuilder.DropIndex(
                name: "IX_Businesses_UserId",
                table: "Businesses");

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

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Businesses",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Businesses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "CategoryName" },
                values: new object[,]
                {
                    { new Guid("41005000-c22e-4ef8-b8ca-eb79890aaaa8"), "Hotels" },
                    { new Guid("5020933d-5fa9-4c60-a125-2523bba36921"), "Cafe" },
                    { new Guid("56aebe1c-02f5-4865-945c-e36a71971936"), "Hospital" },
                    { new Guid("8bb1cdce-9aa4-404f-9c74-71a89bf0b0c7"), "Shopping" },
                    { new Guid("ad1d5ac6-f01b-4996-bb21-1a5d6521e0a8"), "Gym" },
                    { new Guid("e41fddb0-bea3-48a8-884a-b2420038c7a7"), "Resturant" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Businesses_ApplicationUserId",
                table: "Businesses",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Businesses_AspNetUsers_ApplicationUserId",
                table: "Businesses",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
