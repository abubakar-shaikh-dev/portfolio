import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { PageLayout } from '@/components/layout/PageLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { OpenSourcePage } from '@/pages/OpenSourcePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ThoughtsPage } from '@/pages/ThoughtsPage';
import { ArticleDetailPage } from '@/pages/ArticleDetailPage';
import { ContactPage } from '@/pages/ContactPage';

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/open-source" element={<OpenSourcePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/thoughts" element={<ThoughtsPage />} />
        <Route path="/thoughts/:slug" element={<ArticleDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Toaster position="top-right" theme="dark" closeButton />
    </PageLayout>
  );
}

export default App;
