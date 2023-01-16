import { FC, useEffect, useState } from "react";
import Api from "../../GlobalSerice/api";
import { PageContainer } from "../../globalStyles";
import ApiAdm from "../Admin/ApiAdm/ApiAdm";
import CarouselMain from "./CarouselMain";
import Catalogs from "./Catalogs";
import FeaturesConcierge from "./FeaturesConcierge";
import InspirationHome from "./InspirationHome";
import UnltdDreamsSection from "./UnltdDreamsSection";
import WhoAreWe from "./WhoAreWe";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

interface ItensBanner {
  active: string,
  createdAt: string,
  id: string,
  image: string,
  name: string,
  page: string
}

const Home: FC = () => {
  const token = async () => {
    await Api.post('/oauth/access-token', { "grant_type": "client_credentials" }, { headers: { Authorization: 'Basic MjU2OWQ1YjMtNzY1Yy00MjYyLTgwMzctOTc5ZGFjYTk5NzgyOjMyZjc1NDhkLTg4M2EtNGUyNi04ZTkyLThhYThlOGM2ZTQzZQ==', 'Content-Type': 'application/json' } })
    .then(async (response) => {
      localStorage.setItem(TOKEN_KEY, response.data.access_token);
      {
        let url = '/banner/findbypage/home';
        await ApiAdm.get(url, {
          headers: { 
            access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
            client_id: '2569d5b3-765c-4262-8037-979daca99782',
            'Content-Type': 'application/json' 
          } 
        }).then(response => {
          const itensBannerSuperior: Array<ItensBanner> = [];
          const itensBannerInferior: Array<ItensBanner> = [];
    
          response.data.forEach((elem: any) => {       
            let paramElem = {
              active: elem.active,
              createdAt: elem.createdAt,
              id: elem.id,
              image: elem.filename,
              name: elem.name,
              page: elem.page
            };
    
            if (elem.id.includes('banner_superior')) {
              itensBannerSuperior.push(paramElem);
            } else if (elem.id.includes('banner_inferior')) {
              itensBannerInferior.push(paramElem);
            }
          });
    
          const currentPostBannerSuperior = itensBannerSuperior.slice(0, 10);
          const currentPostBannerInferior = itensBannerInferior.slice(0, 10);
          setCurrentPostsBannerSup(currentPostBannerSuperior);
          setCurrentPostsInferior(currentPostBannerInferior);
      
        })
      }
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    token();
  }, [])

  const [listItensBannerSuperior, setCurrentPostsBannerSup] = useState<any>();
  const [listItensBannerInferior, setCurrentPostsInferior] = useState<any>();

  const serviceAdm = async () => {
    let url = '/banner/findbypage/home';
    await ApiAdm.get(url, {
      headers: { 
        access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
        client_id: '2569d5b3-765c-4262-8037-979daca99782',
        'Content-Type': 'application/json' 
      } 
    }).then(response => {
      const itensBannerSuperior: Array<ItensBanner> = [];
      const itensBannerInferior: Array<ItensBanner> = [];

      response.data.forEach((elem: any) => {       
        let paramElem = {
          active: elem.active,
          createdAt: elem.createdAt,
          id: elem.id,
          image: elem.filename,
          name: elem.name,
          page: elem.page
        };

        if (elem.id.includes('banner_superior')) {
          itensBannerSuperior.push(paramElem);
        } else if (elem.id.includes('banner_inferior')) {
          itensBannerInferior.push(paramElem);
        }
      });

      const currentPostBannerSuperior = itensBannerSuperior.slice(0, 10);
      const currentPostBannerInferior = itensBannerInferior.slice(0, 10);
      setCurrentPostsBannerSup(currentPostBannerSuperior);
      setCurrentPostsInferior(currentPostBannerInferior);
  
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      await serviceAdm();
    };
    fetchData();
  }, [
    
  ]);

  return (
    <PageContainer>
      <CarouselMain listBannerSup={listItensBannerSuperior}/>
      <UnltdDreamsSection />
      <Catalogs />
      <WhoAreWe />
      <FeaturesConcierge />
      <InspirationHome listBannerInf={listItensBannerInferior}/>
    </PageContainer>
  );
};

export default Home;
