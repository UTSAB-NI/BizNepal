using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class modifybusinesstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "Businesses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

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
                name: "IX_Businesses_CategoryId",
                table: "Businesses",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Businesses_Categories_CategoryId",
                table: "Businesses",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Businesses_Categories_CategoryId",
                table: "Businesses");

            migrationBuilder.DropIndex(
                name: "IX_Businesses_CategoryId",
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
                name: "CategoryId",
                table: "Businesses");
        }
    }
}
