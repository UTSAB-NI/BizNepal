using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class Removeaddresscolumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Businesses");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Businesses",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
