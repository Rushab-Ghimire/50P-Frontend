import { gql } from "graphql-request";
import { PER_PAGE } from "@app/_utilities/constants/paths";
import moment from "moment";


export const bookLabAppointment = (d) => {
  var bookingDateTime = moment(d.bookingDateTime).format("YYYY-MM-DD HH:mm:00ZZ");

  if(d.customNote === undefined)
  {
    d.customNote = "";
  }

  var insuranceLine = "";
  if(d.insuranceProvider !== undefined && `${d.insuranceProvider}`.trim() !== "")
  {
    insuranceLine = `insuranceProvider: ${d.insuranceProvider}`;
  }

 
  return gql`
    mutation M {
      labBookingAdd(
        providerId: ${d.providerId}
        bookingDateTime: "${bookingDateTime}"
        customNote: "${d.customNote}"
        insuranceFileUuid: "${d.insuranceFileUuid}"
        reportFileUuid: "${d.reportFileUuid}"
        postalCode: "${d.postalCode}"
        ${insuranceLine}
        subscriptionNumber: "${d.subscriptionNumber}"
        memberId: "${d.memberId}"
      ) {
            labBooking {
                id
            }
        }
    }
  `;
};

export const bookPatientAppointment = (d) => {
  var bookingDateTime = moment(d.bookingDateTime).format("YYYY-MM-DD HH:mm:00ZZ");

  if(d.customNote === undefined)
  {
    d.customNote = "";
  }

  var insuranceLine = "";
  if(d.insuranceProvider !== undefined && `${d.insuranceProvider}`.trim() !== "")
  {
    insuranceLine = `insuranceProvider: ${d.insuranceProvider}`;
  }

 
  return gql`
    mutation M {
      patientBookingAdd(
        providerId: ${d.providerId}
        bookingDateTime: "${bookingDateTime}"
        customNote: "${d.customNote}"
        insuranceFileUuid: "${d.insuranceFileUuid}"
        reportFileUuid: "${d.reportFileUuid}"
        postalCode: "${d.postalCode}"
        ${insuranceLine}
        subscriptionNumber: "${d.subscriptionNumber}"
        memberId: "${d.memberId}"
      ) {
            patientBooking {
                id
            }
        }
    }
  `;
};

export const updatePatientAppointment = (d) => {
  var bookingDateTime = moment(d.bookingDateTime).format("YYYY-MM-DD HH:mm:00ZZ");

  var lineInsurance = "";
  if(d.insuranceFileUuid.trim() != "")
  {
    lineInsurance = `insuranceFileUuid: "${d.insuranceFileUuid}"`;
  }

  var lineReport = "";
  if(d.reportFileUuid.trim() != "")
  {
    lineReport = `reportFileUuid: "${d.reportFileUuid}"`;
  }

  //console.log("d", d);
  var insuranceLine = "";
  if(d.insuranceProvider !== undefined && `${d.insuranceProvider}`.trim() !== "")
  {
    insuranceLine = `insuranceProvider: ${d.insuranceProvider}`;
  }


  return gql`
    mutation M {
      patientBookingUpdate(
        id: ${d.id}
        bookingDateTime: "${bookingDateTime}"
        customNote: "${d.customNote}"
        ${insuranceLine}
        subscriptionNumber: "${d.subscriptionNumber}"
        memberId: "${d.memberId}"
        ${lineInsurance}
        ${lineReport}
      ) {
            PatientBooking {
                id
            }
        }
    }
  `;

  /*if(d.insuranceFileUuid.trim() == "")
  {
    return gql`
    mutation M {
      patientBookingUpdate(
        id: ${d.id}
        bookingDateTime: "${bookingDateTime}"
        customNote: "${d.customNote}"
        postalCode: "${d.postalCode}"
      ) {
            PatientBooking {
                id
            }
        }
    }
  `;
  }
  else{
    return gql`
    mutation M {
      patientBookingUpdate(
        id: ${d.id}
        bookingDateTime: "${bookingDateTime}"
        customNote: "${d.customNote}"
        ${lineInsurance}
      ) {
            PatientBooking {
                id
            }
        }
    }
  `;
  }*/
  
};