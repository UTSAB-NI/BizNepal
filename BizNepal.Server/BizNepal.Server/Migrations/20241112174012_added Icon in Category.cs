using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedIconinCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("1db132a3-4ad9-41f7-aaf8-c9ab2387c4a1"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("2d01d23b-5da2-49d1-905d-a33253bf6f3e"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("8566a3dc-1f09-4078-bb73-d0f6e5cc25ab"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("a4d5144d-f0b2-4efd-a175-68ccf48f4212"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("f3b62084-7775-494b-9ad1-310fd8ebe91f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("feaea762-d399-47e3-86a6-519c45ec92b3"));

            migrationBuilder.AddColumn<string>(
                name: "IconPath",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "CategoryName", "IconPath" },
                values: new object[,]
                {
                    { new Guid("02f29cb1-0ab3-4832-9702-f338787fbc70"), "Shopping", null },
                    { new Guid("412050d6-0779-4666-a273-65429733bcb7"), "Resturant", null },
                    { new Guid("86a50d76-7abe-4ec0-beb1-920f653ec0dc"), "Gym", null },
                    { new Guid("93f12ebf-6251-4dfa-89e0-355310a88a75"), "Hotels", null },
                    { new Guid("d4a6d983-62ec-4f6f-8e03-4a783cfb952f"), "Hospital", null },
                    { new Guid("f7eb803a-5eaf-49c0-8327-f220bbb1e19e"), "Cafe", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("02f29cb1-0ab3-4832-9702-f338787fbc70"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("412050d6-0779-4666-a273-65429733bcb7"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("86a50d76-7abe-4ec0-beb1-920f653ec0dc"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("93f12ebf-6251-4dfa-89e0-355310a88a75"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("d4a6d983-62ec-4f6f-8e03-4a783cfb952f"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "CategoryId",
                keyValue: new Guid("f7eb803a-5eaf-49c0-8327-f220bbb1e19e"));

            migrationBuilder.DropColumn(
                name: "IconPath",
                table: "Categories");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "CategoryName" },
                values: new object[,]
                {
                    { new Guid("1db132a3-4ad9-41f7-aaf8-c9ab2387c4a1"), "Hotels" },
                    { new Guid("2d01d23b-5da2-49d1-905d-a33253bf6f3e"), "Cafe" },
                    { new Guid("8566a3dc-1f09-4078-bb73-d0f6e5cc25ab"), "Shopping" },
                    { new Guid("a4d5144d-f0b2-4efd-a175-68ccf48f4212"), "Hospital" },
                    { new Guid("f3b62084-7775-494b-9ad1-310fd8ebe91f"), "Resturant" },
                    { new Guid("feaea762-d399-47e3-86a6-519c45ec92b3"), "Gym" }
                });
        }
    }
}
