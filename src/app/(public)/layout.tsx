'use client'

import React from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import WhatsAppButton from '../../components/layout/WhatsAppButton'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="page-fade-in" style={{ paddingTop: '80px' }}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
