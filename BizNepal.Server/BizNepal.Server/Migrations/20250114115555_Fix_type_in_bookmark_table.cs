using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class Fix_type_in_bookmark_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookmarks_Businesses_BusinnessId",
                table: "Bookmarks");

            migrationBuilder.RenameColumn(
                name: "BusinnessId",
                table: "Bookmarks",
                newName: "BusinessId");

            migrationBuilder.RenameIndex(
                name: "IX_Bookmarks_BusinnessId",
                table: "Bookmarks",
                newName: "IX_Bookmarks_BusinessId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookmarks_Businesses_BusinessId",
                table: "Bookmarks",
                column: "BusinessId",
                principalTable: "Businesses",
                principalColumn: "BusinessId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookmarks_Businesses_BusinessId",
                table: "Bookmarks");

            migrationBuilder.RenameColumn(
                name: "BusinessId",
                table: "Bookmarks",
                newName: "BusinnessId");

            migrationBuilder.RenameIndex(
                name: "IX_Bookmarks_BusinessId",
                table: "Bookmarks",
                newName: "IX_Bookmarks_BusinnessId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookmarks_Businesses_BusinnessId",
                table: "Bookmarks",
                column: "BusinnessId",
                principalTable: "Businesses",
                principalColumn: "BusinessId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
