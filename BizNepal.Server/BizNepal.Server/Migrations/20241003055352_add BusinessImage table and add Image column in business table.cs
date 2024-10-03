using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class addBusinessImagetableandaddImagecolumninbusinesstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "BusinessImages",
                columns: table => new
                {
                    ImageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessImages", x => x.ImageId);
                    table.ForeignKey(
                        name: "FK_BusinessImages_Businesses_BusinessId",
                        column: x => x.BusinessId,
                        principalTable: "Businesses",
                        principalColumn: "BusinessId",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_BusinessImages_BusinessId",
                table: "BusinessImages",
                column: "BusinessId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusinessImages");

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
                    { new Guid("10ff88ae-8850-4f0f-988d-d772cf9d6900"), "Resturant" },
                    { new Guid("72e94afa-9272-4cef-b653-fa4ed520ebfd"), "Shopping" },
                    { new Guid("a787c5ac-90fc-440d-a38a-717cc6baf29e"), "Hospital" },
                    { new Guid("db787fbd-2e9c-4469-af99-ff30248cfe18"), "Cafe" },
                    { new Guid("de57da2f-e1ef-4ead-ab1b-62eefb4c8fd0"), "Gym" },
                    { new Guid("e04972a5-1358-47ca-9fd1-2f01de5d1b5a"), "Hotels" }
                });
        }
    }
}
