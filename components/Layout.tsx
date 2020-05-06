type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => (
  <div className="antialiased text-gray-900 flex justify-center items-center w-full min-h-screen">
    {children}
  </div>
);

export default Layout;
