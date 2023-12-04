import React, { useEffect, useRef, useState } from 'react';
import IconChatBot from '@/assets/images/icon-chat-bot.png';
import LogoDestimate from '@/assets/images/logo-destimate.png';

import { APIPromo } from '@/apis/APIPromo';
import { RotateCcwIcon, SendIcon } from 'lucide-react';
import { formatDate } from '@/utils/format';
import { bubbleLeft, bubbleRight } from '@/utils/bubble';
import { Spinner } from '@/components/Elements';

export const ChatBot = () => {
  const bottomRef = useRef(null);
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const [arrQuestion, setArrQuestion] = useState([]);
  const [check, setCheck] = useState({ data: '' });
  const [data, setData] = useState({ message: '' });
  const [prompts, setPrompts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setDate(formatDate(new Date().toLocaleString(), 'D MMMM YYYY, HH:mm'));
      setCheck((prevCheck) => ({ ...prevCheck, data: data.message }));
      setArrQuestion((prevArrQuestion) => [...prevArrQuestion, data.message]);

      const result =
        arrQuestion.length > 0
          ? await APIPromo.addChatBot({
              message:
                'pertanyaan sebelumnya \n' +
                arrQuestion
                  .map((question, index) => `pertanyaan ${index + 1}: ${question}`)
                  .join('\n') +
                'jawab berhubungan dengan pertanyaan dan jawaban yang harusnya anda jawab dari pertanyaan sebelumnya untuk pertanyaan berikut : \n' +
                data.message,
            })
          : await APIPromo.addChatBot({
              message: data.message,
            });

      setPrompts((prevPrompts) => [
        ...prevPrompts,
        { question: data.message, answer: result.data },
      ]);
    } catch (error) {
      setDate('');
      setIsLoading(false);
    } finally {
      setData({ message: '' });
      setIsLoading(false);
      setIsRotating(false);
    }
  };

  const handleReset = () => {
    setArrQuestion([]);
    setIsRotating(true);
    setIsLoading(false);
    setDate('');
    setPrompts([]);
    setData({ message: '' });
    setCheck({ data: '' });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [prompts, isLoading]);

  return (
    <div className="flex min-h-[470px] flex-col justify-between xl:max-h-[470px]">
      <div className="pb-5">
        <p className="text-center text-sm text-[#AEAEAE]">{date}</p>
      </div>
      <div>
        <div className="relative flex max-h-screen flex-col overflow-y-hidden hover:overflow-y-auto xl:max-h-[330px]">
          {date ? (
            prompts.map((prompt, index) => (
              <div key={index}>
                <div className="flex items-end justify-end">
                  <p className="bg-primary-40 text-[15px] text-white" style={bubbleRight}>
                    {prompt.question}
                  </p>
                </div>

                <div className="flex">
                  <div className="my-6 -mr-3 flex flex-row items-end">
                    <div className="h-6 w-6 rounded-full border border-primary-80 bg-white p-0.5 md:h-12 md:w-12 md:px-2 md:py-3">
                      <img src={IconChatBot} alt="Chat Bot Icon" />
                    </div>
                  </div>
                  <p
                    className="whitespace-pre-line bg-[#F0F0F0] text-[15px] text-black"
                    style={bubbleLeft}
                  >
                    {prompt.answer}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <BlankChat />
          )}
          {isLoading && (
            <>
              <div className="flex items-end justify-end">
                <p className="bg-primary-40 text-[15px] text-white" style={bubbleRight}>
                  {check.data}
                </p>
              </div>

              <div className="flex">
                <div className="my-6 -mr-3 flex flex-row items-end">
                  <div className="h-6 w-6 rounded-full border border-primary-80 bg-white p-0.5 md:h-12 md:w-12 md:px-2 md:py-3">
                    <img src={IconChatBot} alt="Chat Bot Icon" />
                  </div>
                </div>
                <div
                  className="whitespace-pre-line bg-[#F0F0F0] text-[15px] text-black"
                  style={bubbleLeft}
                >
                  <div className="flex items-center justify-center">
                    <Spinner size="md" />
                  </div>
                </div>
              </div>
            </>
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-5 flex">
            <div onClick={handleReset} className="-ml-4 cursor-pointer p-3 md:-ml-8">
              <RotateCcwIcon
                size={25}
                style={{
                  transform: !isRotating ? 'rotate(360deg)' : 'none',
                  transition: 'transform 0.5s',
                }}
              />
            </div>
            <textarea
              name="message"
              id="message"
              rows={1}
              value={isLoading ? '' : data.message}
              placeholder="Kirim pertanyaanmu di sini...."
              onChange={(e) => setData({ ...data, message: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              className="w-full resize-none overflow-hidden rounded border-[#C6C6C6] p-3 pr-12 text-[13px] text-black md:text-base"
            ></textarea>
            <button
              type="submit"
              className="-ml-[45px] mr-2 mt-[7px] flex h-9 w-9 items-center justify-center rounded bg-primary-40 pr-1 pt-1 hover:bg-primary-80"
              disabled={isLoading}
              style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
            >
              <SendIcon color="white" />
            </button>
          </div>
        </form>
        <p className=" mt-2 text-center text-[8px] text-[#AEAEAE] md:text-sm">
          Virtual Asisten bisa saja memberi informasi yang tidak tepat. Mohon untuk memeriksa
          kembali informasi yang diberikan
        </p>
      </div>
    </div>
  );
};

const BlankChat = () => {
  return (
    <div className="mb-36 flex flex-col items-center justify-center">
      <div className="w-14">
        <img src={LogoDestimate} alt="Destimate Logo" />
      </div>
      <div className="mt-5 text-center font-sans text-black">
        <h2 className="text-xl font-bold">Mau Cari Promo Apa ?</h2>
        <p className="text-sm">
          DeBot Akan membantu kamu menjawab pertanyaan terkait rekomendasi Promo Destinasi
        </p>
      </div>
    </div>
  );
};
