import Layout from "../../components/layout";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <Layout>
        <section>
          {/* Include shared UI here e.g. a header or sidebar */}
          <nav></nav>
    
          {children}
        </section>
      </Layout>
    )
  }