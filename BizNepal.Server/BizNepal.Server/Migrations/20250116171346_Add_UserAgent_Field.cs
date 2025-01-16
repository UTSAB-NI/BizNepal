using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class Add_UserAgent_Field : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserAgent",
                table: "PageVisits",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserAgent",
                table: "PageVisits");
        }
    }
}
