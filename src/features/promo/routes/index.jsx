import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';
import IconChatBot from '@/assets/images/icon-chat-bot.png';

import { AddPromo } from '../components/AddPromo';
import { bubbleRight } from '@/utils/bubble';
import { ChatBot } from '../components/ChatBot';
import { EditPromo } from '../components/EditPromo';
import { PromoList } from '../components/PromoList';

export const Promo = () => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible((prevIsVisible) => !prevIsVisible);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ContentLayout title="Promo">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <span className="px-2 text-sm font-semibold text-primary-100">Promo</span>
        </Breadcrumb>
      </div>

      <div className="mt-6">
        <div className="mb-5 flex items-center justify-end">
          <div className="flex w-full justify-start">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Data Promo</h1>
            </div>
          </div>
          <div className="absolute flex sm:relative">
            {isVisible && (
              <div className="-mr-2 -mt-14 md:-mt-16">
                <p
                  className="w-[280px] rounded-xl bg-primary-40 text-xs text-white  md:w-[320px] md:text-sm"
                  style={bubbleRight}
                >
                  Bisa tanya aku kalau kamu masih bingung mencari promo yang menarik
                </p>
              </div>
            )}

            <Link to="/promo/virtual-asisten">
              <div className="-mt-5 h-14 w-14 rounded-full border border-primary-80 bg-white px-2 py-3">
                <img src={IconChatBot} alt="Chat Bot Icon" />
              </div>
            </Link>
          </div>
        </div>
        <PromoList />
      </div>
    </ContentLayout>
  );
};

export const EditPromoRoute = () => {
  const navigate = useNavigate();

  return (
    <>
      <ContentLayout title="Edit Promo">
        <div className="justify-between sm:flex">
          <Breadcrumb>
            <Link to="/promo">
              <span className="px-2 text-sm font-semibold text-gray-700">Promo</span>
            </Link>
            <span className="px-2 text-sm font-semibold text-primary-100">Edit Promo</span>
          </Breadcrumb>
        </div>

        <div className="mt-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Edit Promo</h1>
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-lg border border-gray-100 bg-white px-5 py-5 shadow sm:px-[58px] sm:py-[57.5px]">
          <EditPromo onSuccess={() => navigate('/promo', { replace: true })} />
        </div>
      </ContentLayout>
    </>
  );
};

export const AddPromoRoute = () => {
  const navigate = useNavigate();

  return (
    <>
      <ContentLayout title="Tambah Promo">
        <div className="justify-between sm:flex">
          <Breadcrumb>
            <Link to="/promo">
              <span className="px-2 text-sm font-semibold text-gray-700">Promo</span>
            </Link>
            <span className="px-2 text-sm font-semibold text-primary-100">Tambah Promo</span>
          </Breadcrumb>
        </div>

        <div className="mt-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Tambah Promo</h1>
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-lg border border-gray-100 bg-white px-5 py-5 shadow sm:px-[58px] sm:py-[57.5px]">
          <AddPromo onSuccess={() => navigate('/promo', { replace: true })} />
        </div>
      </ContentLayout>
    </>
  );
};

export const ChatBotRoute = () => {
  return (
    <>
      <ContentLayout title="Virtual Asisten">
        <div className="justify-between sm:flex">
          <Breadcrumb>
            <Link to="/promo">
              <span className="px-2 text-sm font-semibold text-gray-700">Promo</span>
            </Link>
            <span className="px-2 text-sm font-semibold text-primary-100">Virtual Asisten</span>
          </Breadcrumb>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between rounded-[8px] bg-primary-40 px-4 py-1">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-white sm:text-2xl">Virtual Asisten</h1>
            </div>
            <div className="h-12 w-12 rounded-full border border-primary-80 bg-white px-2 py-3">
              <img src={IconChatBot} alt="Chat Bot Icon" />
            </div>
          </div>
        </div>
        <div className="-mb-20 mt-6 rounded-lg border border-gray-100 bg-white px-5 py-3 shadow sm:px-10 ">
          <ChatBot />
        </div>
      </ContentLayout>
    </>
  );
};
