const Crown = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height={35}
      viewBox="0 0 24 24"
      width={35}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm6.989 10.044l-1.087 6.333a.75.75 0 01-.739.623H6.837a.75.75 0 01-.739-.623l-1.087-6.333a.75.75 0 011.068-.801l2.894 1.409 2.372-4.267c.264-.477 1.047-.477 1.311 0l2.372 4.267 2.894-1.409a.749.749 0 011.067.801z" />
    </svg>
  );
};
export default Crown;
