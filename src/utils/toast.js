import Swal from 'sweetalert2';

// Custom theme configuration matching your color scheme
const customTheme = {
  confirmButtonColor: '#1B5299',
  cancelButtonColor: '#694D75',
  background: '#F1ECCE',
  color: '#331832',
};

// Success toast
export const showSuccess = (message, title = 'Success!') => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: message,
    ...customTheme,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
  });
};

// Error toast
export const showError = (message, title = 'Error!') => {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: message,
    ...customTheme,
    confirmButtonText: 'OK',
  });
};

// Warning toast
export const showWarning = (message, title = 'Warning!') => {
  return Swal.fire({
    icon: 'warning',
    title: title,
    text: message,
    ...customTheme,
    confirmButtonText: 'OK',
  });
};

// Info toast
export const showInfo = (message, title = 'Info') => {
  return Swal.fire({
    icon: 'info',
    title: title,
    text: message,
    ...customTheme,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
  });
};

// Confirmation dialog
export const showConfirm = (message, title = 'Are you sure?') => {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, do it!',
    cancelButtonText: 'Cancel',
    ...customTheme,
  });
};

// Loading toast
export const showLoading = (message = 'Processing...') => {
  return Swal.fire({
    title: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    background: customTheme.background,
    color: customTheme.color,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

// Close loading
export const closeLoading = () => {
  Swal.close();
};

// Custom toast for booking confirmation
export const showBookingSuccess = (serviceName) => {
  return Swal.fire({
    icon: 'success',
    title: 'Booking Confirmed!',
    html: `Your booking for <strong>${serviceName}</strong> has been confirmed.<br/>Check your email for details.`,
    ...customTheme,
    confirmButtonText: 'Great!',
    timer: 5000,
    timerProgressBar: true,
  });
};