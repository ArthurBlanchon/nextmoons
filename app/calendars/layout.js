

export default function CalendarsLayout({
    children, // will be a page or nested layout
  }) {
    return (
        <section>
          {/* Include shared UI here e.g. a header or sidebar */}
          <nav> Layout Calendars</nav>
    
          {children}
        </section>
    )
  }