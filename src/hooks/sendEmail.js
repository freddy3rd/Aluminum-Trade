async function sendEmail(setIsSubmitting, setIsSubmit, formData) {
  setIsSubmitting(true);

  try {
    const response = await fetch("/#/api/contact.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitting(false);
      setIsSubmit(true);
      // setFormState({ name: "", phone: "", message: "" });
    } else {
      throw new Error("Failed to send");
    }
  } catch (error) {
    console.error("Submission Error:", error);
    alert("Something went wrong. Please try again later.");
  } finally {
    setIsSubmitting(false);
  }
}

export default sendEmail;
