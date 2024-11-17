using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BizNepal.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddedAddressIdInBusiness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AddressId",
                table: "Businesses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Businesses_AddressId",
                table: "Businesses",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Businesses_Addresses_AddressId",
                table: "Businesses",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Businesses_Addresses_AddressId",
                table: "Businesses");

            migrationBuilder.DropIndex(
                name: "IX_Businesses_AddressId",
                table: "Businesses");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Businesses");
        }
    }
}
