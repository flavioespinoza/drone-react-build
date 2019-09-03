import * as React from "react";

const EmailButtons = () => {
  return (
    <section>
      <button type="button" disabled={!dirty || isSubmitting}
        className="outline"
        onClick={handleReset}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </section>
  );
};

export default EmailButtons;
