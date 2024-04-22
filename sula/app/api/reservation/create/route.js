import prisma from "@/app/db/prismaClient";
function convertToISO8601(dateTimeString) {
    const parts = dateTimeString.match(/(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2}) (AM|PM)/);
  
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[2], 10) - 1; 
    const year = parseInt(parts[3], 10);
    let hours = parseInt(parts[4], 10);
    const minutes = parseInt(parts[5], 10);
    const ampm = parts[6];
  
    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    }
    if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }
  
    const date = new Date(Date.UTC(year, month, day, hours, minutes));
  
    date.setUTCHours(date.getUTCHours() - 7);
  
    const isoStringWithTimezone = date.toISOString().replace('Z', '-07:00');
  
    return isoStringWithTimezone;
}
  
export const POST = async (req) => {
    const formData = await req.formData();
    const reservation = {
        idRestaurant: 0,
        dateTime: "",
        numberOfGuests: 0,
        name: "",
        email: "",
        phone: "",
        specialRequest: "",
        location: ""
    }
    reservation.idRestaurant = parseInt(formData.get('idRestaurant'));
    reservation.dateTime = convertToISO8601(formData.get('dateTime'));
    reservation.numberOfGuests = formData.get('numberOfGuests');
    reservation.name = formData.get('firstName') + ' ' + formData.get('lastName');
    reservation.email = formData.get('email');
    reservation.phone = formData.get('phone');
    reservation.specialRequest = formData.get('specialRequest');
    reservation.location = formData.get('location');
    try {
        const newReservation = await prisma.Reservation.create({ data: reservation });
        return new Response("Done", { status: 200 })
    }
    catch (error) {
        console.log(error)
        return new Response(error, { status: 500 })
    }
}