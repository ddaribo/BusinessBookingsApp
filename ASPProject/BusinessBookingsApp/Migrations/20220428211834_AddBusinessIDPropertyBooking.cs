using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusinessBookingsApp.Migrations
{
    public partial class AddBusinessIDPropertyBooking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BusinessId",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BusinessId",
                table: "Bookings");
        }
    }
}
