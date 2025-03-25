const validationForm = (name, mobile, email, address) => {
  // Validate Fields
  const newErrors = {};
  if (!name.trim()) newErrors.name = "Name is required";
  if (!mobile.trim()) newErrors.mobile = "Mobile is required";
  else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = "Invalid mobile number";
  if (!email.trim()) newErrors.email = "Email is required";
  if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email";
  if (!address.trim()) newErrors.address = "Address is required";
  return newErrors;
}

export default validationForm