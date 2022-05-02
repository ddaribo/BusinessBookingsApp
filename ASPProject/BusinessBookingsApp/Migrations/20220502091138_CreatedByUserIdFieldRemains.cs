using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusinessBookingsApp.Migrations
{
    public partial class CreatedByUserIdFieldRemains : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedByUserName",
                table: "Businesses",
                newName: "CreatedByUserId");

            migrationBuilder.RenameColumn(
                name: "CreatedByUserName",
                table: "Bookings",
                newName: "CreatedByUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedByUserId",
                table: "Businesses",
                newName: "CreatedByUserName");

            migrationBuilder.RenameColumn(
                name: "CreatedByUserId",
                table: "Bookings",
                newName: "CreatedByUserName");
        }
    }
}
