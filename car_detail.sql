-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2022-01-24 18:12:27
-- サーバのバージョン： 10.4.17-MariaDB
-- PHP のバージョン: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `auction_master`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `car_detail`
--

CREATE TABLE IF NOT EXISTS `car_detail` (
  `id` varchar(17) NOT NULL,
  `car_maker` varchar(16) NOT NULL,
  `car_name` varchar(16) NOT NULL,
  `car_age` int(2) NOT NULL,
  `car_model` varchar(12) NOT NULL,
  `car_shape` varchar(4) NOT NULL,
  `car_grade` varchar(12) NOT NULL,
  `car_evapoint` double(3,0) NOT NULL,
  `car_changesys` int(1) NOT NULL,
  `car_levelposition` int(1) NOT NULL,
  `car_gear` int(1) NOT NULL,
  `car_ecolor` varchar(12) NOT NULL,
  `car_ecolorno` varchar(3) NOT NULL,
  `car_icolor` varchar(12) NOT NULL,
  `car_history` int(2) NOT NULL,
  `car_mileage` int(6) NOT NULL,
  `car_door` int(1) NOT NULL,
  `car_crew` int(2) NOT NULL,
  `car_drivesys` varchar(4) NOT NULL,
  `car_fuel` varchar(4) NOT NULL,
  `car_displacement` int(4) NOT NULL,
  `car_inspection` int(4) NOT NULL,
  `car_certification` int(1) NOT NULL,
  `car_instruction` int(1) NOT NULL,
  `car_repairhistoroy` int(1) NOT NULL,
  `car_foreign` int(1) NOT NULL,
  `car_fstatus` int(1) DEFAULT NULL,
  `car_fhandle` int(1) DEFAULT NULL,
  `car_spare` int(1) NOT NULL,
  `car_remarks` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `car_detail`
--

INSERT INTO `car_detail` (`id`, `car_maker`, `car_name`, `car_age`, `car_model`, `car_shape`, `car_grade`, `car_evapoint`, `car_changesys`, `car_levelposition`, `car_gear`, `car_ecolor`, `car_ecolorno`, `car_icolor`, `car_history`, `car_mileage`, `car_door`, `car_crew`, `car_drivesys`, `car_fuel`, `car_displacement`, `car_inspection`, `car_certification`, `car_instruction`, `car_repairhistoroy`, `car_foreign`, `car_fstatus`, `car_fhandle`, `car_spare`, `car_remarks`) VALUES
('3BDS321V-239413', 'ダイハツ', 'ハイゼットカーゴ', 7, '3BD-S321V', 'W', 'CTDバージョン', 4, 0, 1, 4, 'ホワイト', 'KR4', 'シルバー', 5, 12000, 5, 4, '2WD', 'ガソリン', 1500, 0, 1, 1, 0, 0, NULL, NULL, 1, '保証書'),
('5BALA250S-100123', 'ダイハツ', 'キャスト スタイル', 4, '5BA-LA250S', 'SW', 'CTDバージョン', 4, 0, 1, 4, 'ブラック', '199', 'グレー', 2, 4000, 5, 4, '2WD', 'ガソリン', 2500, 0, 1, 1, 0, 0, NULL, NULL, 1, 'ワンオーナー'),
('5BALA250S-189402', 'ダイハツ', 'キャストスタイル', 6, '5BA-LA250S', 'W', 'CTDバージョン', 4, 0, 1, 4, 'ブラック', '199', 'グレー', 4, 10000, 5, 4, '2WD', 'ガソリン', 1000, 0, 1, 1, 0, 0, NULL, NULL, 1, 'ワンオーナー'),
('5BALA350S-109203', 'ダイハツ', 'ミラ イース', 8, '5BA-LA350S', 'SW', 'CTDバージョン', 4, 0, 1, 4, 'ホワイト', 'KR4', 'グレー', 6, 20500, 5, 4, '2WD', 'ガソリン', 1000, 0, 1, 1, 0, 0, NULL, NULL, 1, 'LEDヘッドライト　フロアマット純正'),
('DAAMH55S-123550', 'スズキ', 'ワゴンR', 3, 'DAA-MH55S', 'W', 'CTDバージョン', 4, 0, 1, 4, 'ホワイト', 'KR4', 'グレー', 3, 10000, 5, 4, '4WD', 'ガソリン', 1000, 0, 1, 1, 0, 0, NULL, NULL, 1, 'リサイクル料：リ済別'),
('DAAMK53S-101234', 'スズキ', 'スペーシア', 2, 'DAA-MK53S', 'SW', 'CTDバージョン', 4, 0, 0, 0, 'ブラック', 'KR4', 'グレー', 4, 15000, 5, 4, '2WD', 'ガソリン', 1000, 0, 1, 1, 0, 0, NULL, NULL, 1, 'スマートキー'),
('DBAJF3-0000001', 'ホンダ', 'N-BOX', 3, 'DBA-JF3', 'W', 'CTDバージョン', 4, 0, 1, 4, 'ゴールド', '199', 'シルバー', 2, 5000, 5, 4, '2WD', 'ガソリン', 2000, 0, 1, 1, 0, 0, NULL, NULL, 0, '両側スライドドア　LEDヘッド　ECON　VSA　スマートキー'),
('EXZ10-0000001', 'TOYOTA', 'ラウム', 11, 'GF EXZ10', 'SW', 'CTDバージョン', 4, 0, 1, 4, 'シルバー', '199', 'グレー', 8, 37550, 5, 4, 'FF', 'ガソリン', 1500, 1806, 1, 1, 0, 0, NULL, NULL, 0, 'ワンオーナー車、キーレス、AA初出品、ユーザ買取車'),
('FOURZMR-106566', '日産', 'ステージア', 10, 'E-WGNC34', 'W', 'RS-FOURZMR', 4, 0, 1, 4, 'シルバー', 'KR4', 'グレー', 8, 24020, 5, 4, '4WD', 'ガソリン', 2500, 0, 1, 1, 0, 0, NULL, NULL, 1, 'ワンオーナー、Fエアロパーツ、ユーザ買取、AA初出品'),
('HBDJJ1-132942', 'ホンダ', 'N-VAN', 2, 'HBD-JJ1', 'SW', 'CTDバージョン', 4, 0, 1, 4, 'ホワイト', 'KR4', 'グレー', 4, 15000, 5, 4, '2WD', 'ガソリン', 1500, 0, 1, 1, 0, 0, NULL, NULL, 1, '整備手帳');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
