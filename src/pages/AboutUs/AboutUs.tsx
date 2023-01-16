import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import YouTube from "react-youtube";
import { H4 } from "../../globalStyles";
import ApiAdm from "../Admin/ApiAdm/ApiAdm";
import "./AboutUs.css";
import {
  ImageAbout1,
  ImageAbout2,
  ImageAbout3,
  ImageAbout4,
  ImageAbout5,
  ImageAbout6, ImageSustainability1,
  ImageSustainability2,
  ImageSustainability3,
  ImageSustainability4,
  ImageSustainability5,
  ImageSustainability6, ImageSustainabilityBanner, ImageSustainabilityBannerReservada
} from "./AboutUs.elements";
import InspirationAboutUS from "./InspirationAboutUS";

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

const About: FC = () => {
  const { t, i18n } = useTranslation();

  const opts = {
    height: '500',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const [listItensBannerSuperior, setCurrentPostsBannerSup] = useState<any>();
  const [listItensBannerInferior, setCurrentPostsInferior] = useState<any>();

  const serviceAdm = async () => {
    let url = '/banner/findbypage/about';
    await ApiAdm.get(url, {
      headers: {
        access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
        client_id: '2569d5b3-765c-4262-8037-979daca99782',
        Authorization: 'Basic MjU2OWQ1YjMtNzY1Yy00MjYyLTgwMzctOTc5ZGFjYTk5NzgyOjMyZjc1NDhkLTg4M2EtNGUyNi04ZTkyLThhYThlOGM2ZTQzZQ',
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

  const translateVideos =
    [
      {
        videoId: "IXT2ZpWCJRI",
        translate: "en_US"
      },
      {
        videoId: "IXT2ZpWCJRI",
        translate: "pt_BR"
      },
      {
        videoId: "YEhHGza2AT0",
        translate: 'es_ES'
      }
    ];
    let video = translateVideos.filter(
      (video) => video.translate == i18n.language);
  return (
    <div className="section style-custom">
      <div className="row style-padding-about-us style-padding">
        <div className="col-sm-6">
          {/* <YouTube videoId="IXT2ZpWCJRI" opts={opts} /> */}
          <YouTube videoId={video[0].videoId} opts={opts} />
        </div>
        <div className="col-sm-6">
          <H4 className="d-flex justify-content-center">{t('sobre_portobello_section_1')}</H4>
          <p>
            {t('a_portobello_section_1')} {t('a_portobello_section_2')}
          </p>
          <div className="row">
            <div className="col-sm-4">
              <ImageAbout1></ImageAbout1>
            </div>
            <div className="col-sm-4">
              <ImageAbout2></ImageAbout2>
            </div>
            <div className="col-sm-4">
              <ImageAbout3></ImageAbout3>
            </div>
            <div className="col-sm-4">
              <ImageAbout4></ImageAbout4>
            </div>
            <div className="col-sm-4">
              <ImageAbout5></ImageAbout5>
            </div>
            <div className="col-sm-4">
              <ImageAbout6></ImageAbout6>
            </div>
          </div>
        </div>
      </div>

      <div className="row style-padding-about-us style-row-about  style-padding">
        <div className="col-sm-6">
          <div className="row">
            <div className="col-sm-12">
              <H4> {t('sustenta_section_2')}</H4>
              <p>
                {t('sustenta_section_1')}
              </p>
            </div>
          </div>
          <div className="row style-padding-bottom-2">
            <div className="col-sm-4">
              <ImageSustainability1></ImageSustainability1>
            </div>
            <div className="col-sm-4">
              <ImageSustainability2></ImageSustainability2>
            </div>
            <div className="col-sm-4">
              <ImageSustainability3></ImageSustainability3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <ImageSustainability4></ImageSustainability4>
            </div>
            <div className="col-sm-4">
              <ImageSustainability5></ImageSustainability5>
            </div>
            <div className="col-sm-4">
              <ImageSustainability6></ImageSustainability6>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="style-colum-img-about">
            <ImageSustainabilityBanner></ImageSustainabilityBanner>
            <div className="row">
              <div className="col">
                <H4 style={{ marginTop: "1rem", marginRight: "2rem", marginLeft: "2rem" }}> {t('sustenta_section_3')}</H4>
                <p style={{ marginTop: "1rem", marginRight: "2rem", marginLeft: "2rem" }}>
                  {t('sustenta_section_4')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row style-padding-about-us style-padding">
        <div className="col-sm-6">
          <H4 style={{ marginTop: "rem", marginRight: "2rem" }}>{t('design_section_1')}</H4>
          <p style={{ marginTop: "0rem", marginRight: "0rem" }}>
            {t('design_section_2')}<br /> <br />
            {t('design_section_3')}<br /> <br />
            {t('design_section_4')}<br /> <br />
            {t('design_section_5')}<br /> <br />
            {t('design_section_6')}<br /> <br />
            {t('design_section_7')}<br />
            {t('design_section_8')}
          </p>
        </div>

        <div className="col-sm-6">
          <H4 style={{ marginTop: "", marginRight: "2rem" }}>{t('Propo_section_1')}</H4>
          <p style={{ marginTop: "0rem", marginRight: "3rem" }}>
            {t('Propo_section_2')}<br />
            {t('Propo_section_3')}
          </p>
          <H4 style={{ marginTop: "2rem", marginRight: "2rem" }}>{t('Crença_section_1')}</H4>
          <p style={{ marginTop: "0rem", marginRight: "3rem" }}>
            {t('Crença_section_2')}
          </p>
          <H4 style={{ marginTop: "2rem", marginRight: "2rem" }}>{t('Visao_section_1')}</H4>
          <p style={{ marginTop: "0rem", marginRight: "3rem" }}>
            {t('Visao_section_2')}
          </p>
        </div>
      </div>

      <div className="row style-row-about style-padding style-top-row-about">
        <div className="col-md-12">
          <H4>{t('linha_section_20')}</H4>
        </div>
      </div>
      <div className="row style-row-about style-padding-2 style-top-row-about style-btt-row-about">
        <div className="col-sm-4 -itens">
          <div style={{ marginTop: "0rem", marginRight: "0rem" }}>
            <div className="row">
              <span> <b>2022</b> - {t('linha_section_1')} </span>
            </div>
            <div className="row">
              <span> <b>2020</b> - {t('linha_section_2')}</span>
            </div>
            <div className="row">
              <span><b>2019</b> - {t('linha_section_3')}</span>
            </div>
            <div className="row">
              <span>  <b>2018</b> - {t('linha_section_4')}</span>
            </div>
            <div className="row">
              <span>  <b>2017</b> - {t('linha_section_5')}</span>
            </div>
            <div className="row">
              <span> <b>2016</b> - {t('linha_section_6')}</span>
            </div>
            <div className="row">
              <span> <b>2015</b> - {t('linha_section_7')}</span>
            </div>
            <div className="row">
              <span> <b>2012</b> - {t('linha_section_8')}</span>
            </div>
          </div>
        </div>

        <div className="col-sm-4 -itens">
          <div style={{ marginTop: "0rem", marginRight: "0rem" }}>
            <div className="row">
              <span><b>2008</b> - {t('linha_section_9')}</span>
            </div>
            <div className="row">
              <span><b>2000</b> - {t('linha_section_10')}</span>
            </div>
            <div className="row">
              <span><b>1998</b> - {t('linha_section_11')}</span>
            </div>
            <div className="row">
              <span><b>1995</b> - {t('linha_section_12')}</span>
            </div>
            <div className="row">
              <span><b>1993</b> - {t('linha_section_13')}</span>
            </div>
            <div className="row">
              <span><b>1991</b> - {t('linha_section_14')}</span>
            </div>
            <div className="row">
              <span><b>1992</b> - {t('linha_section_15')}</span>
            </div>
            <div className="row">
              <span><b>1987</b> - {t('linha_section_16')}</span>
            </div>
            <div className="row">
              <span><b>1984</b> - {t('linha_section_17')}</span>
            </div>
            <div className="row">
              <span><b>1981</b> - {t('linha_section_18')}</span>
            </div>
            <div className="row">
              <span><b>1979</b> - {t('linha_section_19')}</span>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <ImageSustainabilityBannerReservada></ImageSustainabilityBannerReservada>
        </div>
      </div>
      <InspirationAboutUS bannerInf={listItensBannerInferior} />
    </div>
  );
};

export default About;
