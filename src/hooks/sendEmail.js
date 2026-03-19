async function sendEmail(setIsSubmitting, setIsSubmit, formData) {
  setIsSubmitting(false);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    if (response.ok) {
      setFormState(formData);
      setIsSubmit(true);
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
