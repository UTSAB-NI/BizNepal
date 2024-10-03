using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class addedcreatedAtandupdatedAtcolumninbusinesstabl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Businesses",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Businesses",
                type: "datetime2",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Businesses");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Businesses");

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
    }
}
