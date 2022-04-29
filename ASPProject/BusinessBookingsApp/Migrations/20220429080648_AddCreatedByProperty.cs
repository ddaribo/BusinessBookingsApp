using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusinessBookingsApp.Migrations
{
    public partial class AddCreatedByProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_AspNetUsers_ApplicationUserId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Businesses_AspNetUsers_ApplicationUserId",
                table: "Businesses");

            migrationBuilder.DropIndex(
                name: "IX_Businesses_ApplicationUserId",
                table: "Businesses");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_ApplicationUserId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Businesses");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Bookings");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUserId",
                table: "Businesses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUserId",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "Businesses");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "Bookings");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Businesses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Bookings",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Businesses_ApplicationUserId",
                table: "Businesses",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ApplicationUserId",
                table: "Bookings",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_AspNetUsers_ApplicationUserId",
                table: "Bookings",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Businesses_AspNetUsers_ApplicationUserId",
                table: "Businesses",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
