import { getPackagesSections } from '@nrwl/nx-dev/data-access-menu';
import { sortCorePackagesFirst } from '@nrwl/nx-dev/data-access-packages';
import { DocViewer } from '@nrwl/nx-dev/feature-doc-viewer';
import {
  ProcessedDocument,
  RelatedDocument,
} from '@nrwl/nx-dev/models-document';
import { Menu, MenuItem, MenuSection } from '@nrwl/nx-dev/models-menu';
import { ProcessedPackageMetadata } from '@nrwl/nx-dev/models-package';
import { DocumentationHeader, SidebarContainer } from '@nrwl/nx-dev/ui-common';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { menusApi } from '../../../../lib/menus.api';
import { useNavToggle } from '../../../../lib/navigation-toggle.effect';
import { content } from '../../../../lib/rspack/content/overview';
import { pkg } from '../../../../lib/rspack/pkg';

export default function Overview({
  document,
  menu,
  relatedDocuments,
}: {
  document: ProcessedDocument;
  menu: MenuItem[];
  pkg: ProcessedPackageMetadata;
  relatedDocuments: RelatedDocument[];
}): JSX.Element {
  const router = useRouter();
  const { toggleNav, navIsOpen } = useNavToggle();
  const wrapperElement = useRef(null);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url.includes('#')) return;
      if (!wrapperElement) return;

      (wrapperElement as any).current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router, wrapperElement]);

  const vm: {
    document: ProcessedDocument;
    menu: Menu;
    relatedDocuments: RelatedDocument[];
  } = {
    document,
    menu: {
      sections: sortCorePackagesFirst<MenuSection>(
        getPackagesSections(menu),
        'id'
      ),
    },
    relatedDocuments,
  };

  return (
    <div id="shell" className="flex h-full flex-col">
      <div className="w-full flex-shrink-0">
        <DocumentationHeader isNavOpen={navIsOpen} toggleNav={toggleNav} />
      </div>
      <main
        id="main"
        role="main"
        className="flex h-full flex-1 overflow-y-hidden"
      >
        <SidebarContainer menu={vm.menu} navIsOpen={navIsOpen} />
        <div
          ref={wrapperElement}
          id="wrapper"
          data-testid="wrapper"
          className="relative flex flex-grow flex-col items-stretch justify-start overflow-y-scroll"
        >
          <DocViewer
            document={vm.document}
            relatedDocuments={vm.relatedDocuments}
          />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const document = {
    content: content,
    description: '',
    filePath: '',
    id: 'overview',
    name: 'Overview of the Nx Rspack Plugin',
    relatedDocuments: {},
    tags: [],
  };

  return {
    props: {
      pkg,
      document,
      relatedDocuments: [],
      menu: menusApi.getMenu('packages', ''),
    },
  };
}
